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

  const coreMods = modules.filter((x) => x.type === "Core").length;
  const ue = modules.filter((x) => x.type === "UE").length;
  const id = modules.filter((x) => x.type === "ID").length;
  const cd = modules.filter((x) => x.type === "CD").length;
  const pe = modules.filter((x) => x.type === "PE").length;
  const validTypes = ["GEI", "GEX", "GEC", "GEA", "GES", "GEN"];
  const allGe = modules.filter((x) => validTypes.includes(x.type)).length;

  return (
    <>
      <section className="heading">
        <h1>Welcome {user && user.name}</h1>
        <p>Overview</p>
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
    </>
  );
}

export default Dashboard;
