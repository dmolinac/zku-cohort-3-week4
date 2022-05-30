import styles from "../styles/Home.module.css"

import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

const schema = yup.object().shape({
  name: yup.string().required(),
  age: yup.number().min(1).max(99).required(),
  address: yup.string().required(),
});

const App = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmitHandler = (data) => {
    console.log({ data });
    reset();
  };
  return (
    <div className={styles.main}>
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <Typography variant="h4" component="h1" gutterBottom>
        Personal info form (all fields required)
      </Typography>
      <br />

      <input {...register("name")} placeholder="name" type="name" required />
      <p>{errors.name?.message}</p>
      <br />

      <input {...register("age")} placeholder="age" type="age" required />
      <p>{errors.age?.message}</p>
      <br />

      <input {...register("address")} placeholder="address" type="address" required />
      <p>{errors.address?.message}</p>
      <br />

      <button type="submit">Submit</button>
      <div><Link href="/box" color="secondary">
        Go to the box page
      </Link>
      </div>
    </form>
    </div>
  );
};

export default App;