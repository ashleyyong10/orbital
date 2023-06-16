import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import { getModules, reset } from "../features/modules/moduleSlice";
import { IoMdArrowRoundBack } from "react-icons/io";

function Ge() {
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

  const gei = modules.filter((x) => x.type === "GEI").length;
  const gex = modules.filter((x) => x.type === "GEX").length;
  const gec = modules.filter((x) => x.type === "GEC").length;
  const gea = modules.filter((x) => x.type === "GEA").length;
  const ges = modules.filter((x) => x.type === "GES").length;
  const gen = modules.filter((x) => x.type === "GEN").length;

  function isCompleted(ge) {
    if (ge === 1) {
      return "Completed";
    } else {
      return "Uncompleted";
    }
  }

  return (
    <>
      <section className="btn-block-left">
        <Link to="/">
          <IoMdArrowRoundBack />
          Back
        </Link>
      </section>
      <section className="heading">
        <h1>GE Modules</h1>
      </section>

      <section className="content">
        <Link to="/gea">
          <b>
            <u>GEA</u>
          </b>
        </Link>
        <p> {isCompleted(gea)} </p>
      </section>

      <section className="content">
        <Link to="/gec">
          <b>
            <u>GEC</u>
          </b>
        </Link>

        <p> {isCompleted(gec)} </p>
      </section>

      <section className="content">
        <Link to="/gei">
          <b>
            <u>GEI</u>
          </b>
        </Link>

        <p> {isCompleted(gei)} </p>
      </section>

      <section className="content">
        <Link to="/gen">
          <b>
            <u>GEN</u>
          </b>
        </Link>

        <p> {isCompleted(gen)} </p>
      </section>

      <section className="content">
        <Link to="/ges">
          <b>
            <u>GES</u>
          </b>
        </Link>

        <p> {isCompleted(ges)} </p>
      </section>

      <section className="content">
        <Link to="/gex">
          <b>
            <u>GEX</u>
          </b>
        </Link>

        <p> {isCompleted(gex)} </p>
      </section>
    </>
  );
}

export default Ge;
