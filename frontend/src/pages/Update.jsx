import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getModules,
  createModule,
  reset,
} from "../features/modules/moduleSlice";
import data from "../BZA.json";

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

  const [jsonData, setJsonData] = useState(data);

  const { moduleCode, type, grade } = formData;
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const { modules, isError, message } = useSelector((state) => state.modules);

  const modQuota = {
    Core: 16,
    ID: 2,
    CD: 1,
    GEA: 1,
    GEC: 1,
    GEI: 1,
    GEN: 1,
    GES: 1,
    GEX: 1,
    PE: 5,
    Ethics: 1,
  };

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
    dispatch(getModules());
  }, [isError, message, dispatch]);

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

  const checker = (user, code, modType, mods) => {
    //step 1
    //making a array of modules that have been completed before
    const userMods = mods.filter((x) => x.user === user._id);

    //step 2
    //checking if module has been done before

    for (const mod of userMods) {
      if (mod.moduleCode === modCode) {
        throw new Error("Module already added");
      }
    }

    //step 3
    // if (user.pillars[modType] === "completed") {
    //   throw new Error("This pillar has already been completed");
    //   }

    //step 3: checking if pillar has alrdy been completed

    const userModsByType = mods.filter((x) => x.type === modType);
    const limit = modQuota[modType];

    if (userModsByType.length === limit) {
      throw new Error("This pillar has already been completed");
    }

    //step 4
    //checking if module matches with type

    // const modTypes = {
    //   CD: "cd",
    //   Core: "core",
    //   Ethics: "ethics",
    //   GEA: "gea",
    //   GEC: "gec",
    //   GEI: "gei",
    //   GEN: "gen",
    //   GES: "ges",
    //   GEX: "gex",
    //   ID: "id",
    //   PE: "pe",
    // };

    // const modTemp = jsonData[modTypes[modType]];

    // if (!modTemp.includes(code)) {
    //   throw new Error(`This module is not a ${modType} module`);
    // }

    // if (modType === "CD") {
    //   const cdMods = jsonData.cd;
    //   console.log(cdMods);
    //   if (!cdMods.includes(code)) {
    //     throw new Error("This module is not a CD module");
    //   }
    // }

    // if (modType === "Core") {
    //   const coreMods = jsonData.core;
    //   console.log(coreMods);
    //   if (!coreMods.includes(code)) {
    //     throw new Error("This module is not a core module");
    //   }
    // }

    //random code below
    // const result = modules.map(mods => mods.type)
    // console.log(result)
    // console.log(code)
    // getRequirements(major).then(x => console.log(x[0].core))
    // getRequirements(major).then(x => console.log(x[0].id))
  };

  const onSubmit = (e) => {
    e.preventDefault();

    try {
      checker(user, moduleCode, type, modules);
      dispatch(createModule({ moduleCode, type, grade }));

      if (moduleCode && type && grade) {
        toast("Module Added");
      }

      setFormData({
        moduleCode: setModCode(""),
        type: "",
        grade: "",
      });
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(message);
    }
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
              <option value="PE">PE</option>
              <option value="UE">UE</option>
              <option value="PE">PE</option>
              <option value="Ethics">Ethics</option>
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
              <option value="D+">D+</option>
              <option value="D">D</option>
              <option value="F">F</option>
              <option value="S/U">S/U</option>
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
