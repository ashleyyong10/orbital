import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createModule, reset } from "../features/modules/moduleSlice";
import { getRequirements } from "../features/requirements/requirementService";

function Update() {
  const [modCode, setModCode] = useState("");
  const [moduleList, setModuleList] = useState([
    { moduleCode: "", title: "", semesters: "" },
  ]);
  const [formData, setFormData] = useState({
    moduleCode: "",
    type: "",
    grade: "",
  });

  const { moduleCode, type, grade } = formData;
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const { modules, isError, message } = useSelector((state) => state.modules);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://api.nusmods.com/v2/2022-2023/moduleList.json`
      );
      const newData = await response.json();
      setModuleList(newData);
    };
    fetchData();
  });

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    dispatch(reset());
  }, [modules, isError, message, dispatch]);

  const onChange = (e) => {
    if (e.target.name === "moduleCode") {
      setModCode(e.target.value);
      setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: { modCode },
      }));
    }
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const checker = (major, code, modType, mods) => {
    //checking if module has been entered before
    //enter some code

    if (modType === "Core") {}

    if (modType === "ID") {}

    if (modType === "CD") {}

    //random code below
    // const result = modules.map(mods => mods.type)
    // console.log(result)
    // console.log(code)
    // getRequirements(major).then(x => console.log(x[0].core))
    // getRequirements(major).then(x => console.log(x[0].id))

  }

  const onSubmit = (e) => {
    e.preventDefault();

    checker({ params: { major: user.major} }, moduleCode, type, modules)

    dispatch(createModule({ moduleCode, type, grade }));

    if (moduleCode && type && grade) {
      toast("Module Added");
    }

    setFormData({
      moduleCode: setModCode(""),
      type: "",
      grade: "",
    });
  };

  return (
    <>
      <section className="heading">
        <p>Add completed modules</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <select
              name="moduleCode"
              id="moduleCode"
              value={modCode}
              onChange={onChange}
            >
              <option value="">Choose module</option>
              {moduleList.map((module) => (
                <option value={module.moduleCode} key={module.moduleCode}>
                  {module.moduleCode}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <select name="type" id="type" value={type} onChange={onChange}>
              <option value="" disabled hidden>
                Select module type
              </option>
              <option value=""> </option>
              <option value="Core">Core</option>
              <option value="ID">ID</option>
              <option value="CD">CD</option>
              <option value="UE">UE</option>
              <option value="GEA">GEA</option>
              <option value="GEC">GEC</option>
              <option value="GEI">GEI</option>
              <option value="GEN">GEN</option>
              <option value="GES">GES</option>
              <option value="GEX">GEX</option>
            </select>
          </div>

          <div className="form-group">
            <select name="grade" id="grade" value={grade} onChange={onChange}>
              <option value="" disabled hidden>
                Select your grade
              </option>
              <option value=""> </option>
              <option value="A+">A+</option>
              <option value="A">A</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B">B</option>
              <option value="B-">B-</option>
              <option value="C+">C+</option>
              <option value="C">C</option>
              <option value="C-">C-</option>
              <option value="D">D</option>
            </select>
          </div>
          <div className="form-group">
            <button className="btn btn-block" type="submit">
              Add Module
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Update;
