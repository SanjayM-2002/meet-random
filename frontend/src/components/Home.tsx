import React, { useState } from 'react';
import LabelledInput from './LaballedInput';
import { Link } from 'react-router-dom';

const Home = () => {
  interface FormDataType {
    fullName: string;
    email: string;
    gender: GenderEnum;
    interests: InterestEnum;
  }
  enum GenderEnum {
    MALE,
    FEMALE,
    OTHER,
  }
  enum InterestEnum {
    MALE,
    FEMALE,
    NON_BINARY,
  }
  const [formData, setFormData] = useState<FormDataType>({
    fullName: '',
    email: '',
    gender: GenderEnum.MALE,
    interests: InterestEnum.FEMALE,
  });
  console.log('formData', formData);
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  return (
    <>
      <div>Home Page</div>
      <div>
        <LabelledInput
          label='Full Name'
          placeholder='Enter your full name'
          name='fullName'
          value={formData.fullName}
          onChange={handleInput}
        />
        <LabelledInput
          label='Email'
          placeholder='Enter your email'
          name='email'
          value={formData.email}
          onChange={handleInput}
        />
      </div>
      <Link to={`/room?fullName=${formData.fullName}`}>Submit</Link>
    </>
  );
};

export default Home;
