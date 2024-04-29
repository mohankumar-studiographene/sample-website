import { useState } from 'react';

import {
  Button,
  Checkbox,
  CountDown,
  InputBox,
  Loader,
  RadioInput,
  Switch,
} from '@/components/general';
import Dropdown from '@/components/general/Dropdown';

import homeStyle from './home.module.scss';

const rowLengthOptions = [
  { value: 5, label: '5' },
  { value: 10, label: '10' },
  { value: 30, label: '30' },
  { value: 50, label: '50' },
  { value: 100, label: '100' },
];

const Home = () => {
  const [formData, setFormData] = useState({ user: 'yes' });
  const [rowLength, setRowLength] = useState(rowLengthOptions[0]);

  const handleChange = e => {
    const { name, value, checked } = e?.target;
    if (name === 'remember' || name === 'user')
      setFormData({ ...formData, [name]: checked ? value : '' });
    else setFormData({ ...formData, [name]: value });
  };

  const handleRowSizeChange = data => {
    setRowLength(data);
  };

  return (
    <div className={homeStyle.container}>
      <h1 className={homeStyle.header}>Common components</h1>
      <CountDown text="send" seconds={5} handleFunction={() => {}} />
      <div className={homeStyle.separator}>&nbsp;</div>
      <h3>Form Components</h3>
      <div className={homeStyle['input-container']}>
        <InputBox
          name="text"
          placeholder="Enter text"
          label="Text box"
          value={formData?.text}
          onChange={handleChange}
        />
        <InputBox
          name="number"
          type="number"
          label="Number input box"
          placeholder="Enter number"
          error="Field is required!"
          otherAttributes={{
            min: 0,
            max: 10,
            step: 2,
            'data-id': 'demo',
          }}
          disableCopyPaste
          value={formData?.number}
          onChange={handleChange}
        />
        <InputBox
          name="password"
          type="password"
          label="Password input box"
          placeholder="Enter password"
          value={formData?.password}
          showHidePassword
          onChange={handleChange}
          helpDeskMessage="Must have at least 6 characters."
        />
      </div>
      <div className={homeStyle['input-container']}>
        <InputBox
          type="email"
          name="email"
          placeholder="Enter email"
          label="Email box"
          value={formData?.email}
          onChange={handleChange}
        />
        <InputBox
          type="tel"
          name="tel"
          placeholder="Enter tel"
          label="Tel box"
          value={formData?.tel}
          onChange={handleChange}
        />
        <InputBox
          name="url"
          type="url"
          label="Url box"
          placeholder="Enter url"
          value={formData?.url}
          onChange={handleChange}
        />
      </div>
      <div className={homeStyle['input-container']}>
        <Checkbox
          label="Remember me"
          value="yes"
          name="remember"
          id="check"
          onChange={handleChange}
        />
        <Checkbox
          label="Is checked"
          value="yes"
          name="user"
          id="user"
          checked={(formData?.user || '') !== ''}
          onChange={handleChange}
        />
        <Checkbox
          label="Disabled"
          value="yes"
          name="user"
          id="demo"
          disabled
          onChange={handleChange}
        />
      </div>
      <div className={homeStyle['input-container']}>
        <div>
          <p>Gender</p>
          <RadioInput
            name="gender"
            label="Male"
            value="male"
            onChange={handleChange}
            id="male"
            checked
          />
          <br />
          <RadioInput
            name="gender"
            label="Female"
            value="female"
            onChange={handleChange}
            disabled
            id="female"
          />
          <br />
          <RadioInput
            name="gender"
            label="Other"
            value="other"
            onChange={handleChange}
            id="other"
          />
        </div>
      </div>
      <div className={homeStyle['input-container']}>
        <div>
          <p>Switch</p>
          <Switch
            id="switch"
            onColor="orange"
            onChange={handleChange}
            status={formData?.switch}
            disabled={false}
            className={homeStyle['mr-10']}
          />
        </div>
      </div>
      <div className={homeStyle['input-container']}>
        <div>
          <Button label="Submit" className={homeStyle['mr-10']} />
          <Button label="Close" variant="outlined" />
        </div>
        <div>
          <Button label="Loading" loading className={homeStyle['mr-10']} />
          <Button label="Loading" variant="outlined" loading />
        </div>
        <div>
          <Button label="Button" className={homeStyle['mr-10']} disabled />
          <Button label="Button" variant="outlined" className={homeStyle['mr-10']} disabled />
          <Button>
            Children&nbsp;&nbsp;
            <Loader />
          </Button>
        </div>
      </div>
      <Dropdown
        options={rowLengthOptions}
        className="home-input"
        selectedValue={rowLength}
        isClearable={false}
        sortedOption={false}
        isSearchable={false}
        onChange={value => handleRowSizeChange(value)}
        placeholder={rowLength?.value}
        classNamePrefix={'select-input-prefix'}
      />
    </div>
  );
};

export default Home;
