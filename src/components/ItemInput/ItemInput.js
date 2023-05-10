export default function ItemInput({category,onChange}){
    return(
        <div className="mb-3 form-group">
            <label className="form-label" htmlFor={category.name}>{category.name}</label>
            <select className="form-select" name={category.name} id={category.name} onChange={onChange} required>
                <option value="" hidden defaultValue>Select {category.name}...</option>
                {category.categoryValues.map(categoryValue=><option value={categoryValue.id} key={categoryValue.id}>{categoryValue.value}</option>)}
            </select>
        </div>
    )
}