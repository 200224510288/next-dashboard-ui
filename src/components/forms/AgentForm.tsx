"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm} from "react-hook-form";
import InputField from "../InputField"; 
import { agentSchema, AgentSchema } from "@/lib/formValidationSchemas";
import { createAgent } from "@/lib/actions";
import { useFormState } from "react-dom";

const AgentForm = ({ type, data }: { type: "create" | "update"; data?: any }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AgentSchema>({
    resolver: zodResolver(agentSchema),

  });

  // user action state

  const [state, formAction] = useFormState( createAgent, 
    {success: false,
       error: false}
  );

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    formAction(data);
  });

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Create a new Agent" : "Update Agent"}
      </h1>
      <span className="text-xs text-gray-400 font-medium">Authentication Information</span>

      <div className="flex justify-between flex-wrap gap-4"> 
        <InputField
          label="Username"
          name="userName"
          defaultValue={data?.User.UserName}
          register={register}
          error={errors?.userName}
        />

        <InputField
          label="Email"
          name="email"
          type="email"
          defaultValue={data?.User.Email}
          register={register}
          error={errors?.email}
        />

        <InputField
          label="Password"
          name="password"
          type="password"
          defaultValue={data?.User.Password}
          register={register}
          error={errors?.password}
        />
      </div>

      <span className="text-xs text-gray-400 font-medium">Personal Information</span>

      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="First Name"
          name="firstName"
          defaultValue={data?.FirstName}
          register={register}
          error={errors.firstName}
        />

        <InputField
          label="Last Name"
          name="lastName"
          defaultValue={data?.LastName}
          register={register}
          error={errors.lastName}
        />

        <InputField
          label="Office Address"
          name="officeAddress"
          defaultValue={data?.OfficeAddress}
          register={register}
          error={errors.officeAddress}
        />

        <InputField
          label="Home Address"
          name="homeAddress"
          defaultValue={data?.HomeAddress}
          register={register}
          error={errors.homeAddress}
        />

        <InputField
          label="City"
          name="city"
          defaultValue={data?.City}
          register={register}
          error={errors.city}
        />
      </div>
        {state.error && <span className="text-red-500 font-semibold">Something went wrong!</span>}
      <button className="bg-blue-400 text-white p-2 rounded-md mt-4">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default AgentForm;
