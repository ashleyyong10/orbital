import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import { getModules, reset } from "../features/modules/moduleSlice";

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { modules, isLoading, isError, message } = useSelector(
    (state) => state.modules
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate("/login");
    }

    dispatch(getModules());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  function GPAcalculator(user, mods) {
    const userMods = mods.filter((x) => x.user === user._id);
    let totalGradePoints = 0;
    let validModulesCount = 0;
  
    for (const module of userMods) {
      const { grade } = module;
  
      if (grade !== 'S/U') {
        switch (grade) {
          case 'A+':
          case 'A':
            totalGradePoints += 5.0;
            break;
          case 'A-':
            totalGradePoints += 4.5;
            break;
          case 'B+':
            totalGradePoints += 4.0;
            break;
          case 'B':
            totalGradePoints += 3.5;
            break;
          case 'B-':
            totalGradePoints += 3.0;
            break;
          case 'C+':
            totalGradePoints += 2.5;
            break;
          case 'C':
            totalGradePoints += 2.0;
            break;
          case 'D+':
            totalGradePoints += 1.5;
            break;
          case 'D':
            totalGradePoints += 1.0;
            break;
          case 'F':
            totalGradePoints += 0.0;
            break;
        }
  
        validModulesCount++;
      }
    }
  
    if (validModulesCount === 0) {
      return 0; // No valid modules, so the final grade is 0
    }
  
    const finalGrade = totalGradePoints / validModulesCount;
    return finalGrade;
  }
  
  const GPA = GPAcalculator(user, modules)
  const coreMods = modules.filter((x) => x.type === "Core").length;
  const ue = modules.filter((x) => x.type === "UE").length;
  const pe = modules.filter((x) => x.type === "PE").length;
  const id = modules.filter((x) => x.type === "ID").length;
  const cd = modules.filter((x) => x.type === "CD").length;
  const ethics = modules.filter((x) => x.type === "Ethics").length;
  const validTypes = ["GEI", "GEX", "GEC", "GEA", "GES", "GEN"];
  const allGe = modules.filter((x) => validTypes.includes(x.type)).length;

  return (
    <>
      <section className="heading">
        <h1>Welcome {user && user.name}</h1>
        <p>Overview</p>
      </section>

      <section className="content">
        <Link to="/core">
          <b>
            <u>Core Modules</u>
          </b>
        </Link>

        <p> {coreMods}/16 completed </p>
      </section>

      <section className="content">
        <Link to="/id">
          <b>
            <u>ID Modules</u>
          </b>
        </Link>
        <p> {id}/2 completed </p>
      </section>

      <section className="content">
        <Link to="/cd">
          <b>
            <u>CD Modules</u>
          </b>
        </Link>
        <p> {cd}/1 completed </p>
      </section>

      <section className="content">
        <Link to="/pe">
          <b>
            <u>Programme Electives</u>
          </b>
        </Link>
        <p> {pe}/5 completed </p>
      </section>

      <section className="content">
        <Link to="/ue">
          <b>
            <u>Unrestricted Electives</u>
          </b>
        </Link>
        <p>{ue}/20 completed</p>
      </section>

      <section className="content">
        <Link to="/ge">
          <b>
            <u>GE Modules</u>
          </b>
        </Link>

        <p> {allGe}/6 pillars completed </p>
      </section>

      <section className="content">
        <Link to="/ethics">
          <b>
            <u>Ethics Module</u>
          </b>
        </Link>
        <p> {ethics}/1 completed </p>
      </section>

      <section className="content"> 
        <b>
          <u>Your GPA</u>
        </b>

        <p> {GPA.toFixed(2)}/5.0 </p>
      </section>
    </>
  );
}

export default Dashboard;
