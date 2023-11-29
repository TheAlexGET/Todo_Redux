import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { addMultipleAction } from '../store/taskReducer';

function MySelect({options, onChange, defaultValue}) {
const dispatch = useDispatch()
  return (
    <Form.Select aria-label="Default select example" onChange={(event) => onChange(event.target.value)}>
      <option>{defaultValue}</option>
      {options.map((option) => 
        <option value={option.value} key={option.name}>{option.name}</option>  
    )}
    </Form.Select>
  );
}

export default MySelect;