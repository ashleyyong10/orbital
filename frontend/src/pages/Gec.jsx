import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ModuleItem from "../components/ModuleItem";
import Spinner from "../components/Spinner";
import { getModules, reset } from "../features/modules/moduleSlice";
import { Link } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";

function Gec() {
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
  return (
    <>
      <section className="btn-block-left">
        <Link to="/Ge">
          <IoMdArrowRoundBack />
          Back
        </Link>
      </section>
      <section className="content">
        {modules.filter((x) => x.type == "GEC").length > 0 ? (
          <>
            <section className="heading">
              <p>GEC module completed: </p>
            </section>
            <div className="modules">
              {modules
                .filter((x) => x.type == "GEC")
                .map((module) => (
                  <ModuleItem key={module._id} module={module} />
                ))}
            </div>
          </>
        ) : (
          <h3>You have not completed any GEC module</h3>
        )}
      </section>
    </>
  );
}

export default Gec;
