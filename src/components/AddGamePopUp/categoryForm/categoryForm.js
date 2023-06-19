

export default function CategoryForm({ index, inputValues, setInputValues }) {
    
    const handleChange = (e) => {
      const { name, value } = e.target;
      const updatedValues = [...inputValues];
      updatedValues[index][name] = value;
      setInputValues(updatedValues);
    };
  
    return (
      <>
        <div>
          <h6 className="text-light">Insert new Category</h6>
        </div>
        <div className="col">
          <input
            type="text"
            className="form-control"
            id={`category${index}`}
            key={`category${index}`}
            name="category"
            value={inputValues[index].category}
            onChange={handleChange}
            placeholder="Category"
            required
          />
        </div>
        <div className="col">
          <input
            type="text"
            className="form-control"
            id={`values${index}`}
            key={`values${index}`}
            name="values"
            placeholder="Values"
            value={inputValues[index].values}
            onChange={handleChange}
            required
          />
        </div>
      </>
    );
  }