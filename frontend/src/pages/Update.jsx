import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createModule, reset } from "../features/modules/moduleSlice";

function Update() {
  const [formData, setFormData] = useState({
    text: '',
    type: '',
    grade: '',
  });
  const { text, type, grade } = formData;

  const dispatch = useDispatch();

  const { modules, isError, message } = useSelector(
    (state) => state.modules
  )


  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    dispatch(reset())
    },  [modules, isError, message, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(createModule({ text, type, grade }));

    if (text && type && grade) {
      toast("Module Added")
    }
    
    setFormData({
      text: "",
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
