import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { MyInput } from "./MyInput";

type FormData = {
  password: string;
  email: string;
};

export const BasicPage = () => {
  const [formData, setFormDataData] = useState<any>("");
  const { register, handleSubmit, control, formState, reset } = useForm<FormData>({
    defaultValues: {
      password: "",
      email: "",
    },
  });

  const onSubmit = handleSubmit((data) => {
    setFormDataData(data);
    console.log(data);
  });

  return (
    <div>
      <h1>基本の使い方</h1>
      <div className="data">
        <b>送信データ</b>
        <pre>{JSON.stringify(formData, null, "\t")}</pre>
      </div>
      <form onSubmit={onSubmit}>
        <section>
          <h2>registerの例</h2>
          <label htmlFor="password">パスワード</label>
          <input id="password" {...register("password", { required: "パスワードは必須です" })} type="password" />
          <p>{formState.errors.password?.message}</p>
        </section>
        <section>
          <h2>Controllerの例</h2>
          <Controller
            name="email"
            control={control}
            rules={{ minLength: { value: 3, message: "3文字以上入力してください" } }}
            render={({ field: { ref: _, ...field }, fieldState: { error } }) => (
              <>
                <MyInput label="email" id="email" {...field} />
                <p>{error?.message}</p>
              </>
            )}
          />
        </section>
        <button>送信</button>
      </form>
    </div>
  );
};
