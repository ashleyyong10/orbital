import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaUser } from "react-icons/fa";
import { register, reset } from "../features/auth/authSlice";
import { createModule } from "../features/modules/moduleSlice";

function Update() {
  const [formData, setFormData] = useState({
    text: "",
    type: "",
    grade: "",
  });

  const { text, type, grade } = formData;

  const dispatch = useDispatch();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(createModule({ text, type, grade }));
    console.log({ text, type, grade });
    setFormData({
      text: "",
      type: "",
      grade: "",
    });

    alert("Module added");
  };

  return (
    <>
      <section className="heading">
        <p>Add completed modules</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="text">Module</label>
            <input
              type="text"
              name="text"
              id="text"
              value={text}
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <select name="type" id="type" value={type} onChange={onChange}>
              <option value="" disabled hidden>
                Select module type
              </option>
              <option value="Core">Core</option>
              <option value="ID">ID</option>
              <option value="CD">CD</option>
              <option value="UE">UE</option>
              <option value="GEA">GEA</option>
              <option value="GEI">GEC</option>
              <option value="GEI">GEI</option>
              <option value="GEI">GEN</option>
              <option value="GEI">GES</option>
              <option value="GEI">GEX</option>
            </select>
          </div>

          <div className="form-group">
            <select name="grade" id="grade" value={grade} onChange={onChange}>
              <option value="" disabled hidden>
                Select your grade
              </option>
              <option value="A+">A+</option>
              <option value="A">A</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B">B</option>
              <option value="B-">B-</option>
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
