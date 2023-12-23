import { Checkbox, CheckboxGroup, LabeledForm, Radio, RadioGroup, Select, TextInput, Textarea } from "@sheinc/shelikes-design-system";
import { Controller, useForm } from "react-hook-form";
import { MyInput } from "./MyInput";
import { useEffect, useState } from "react";

type FormData = {
  password: string;
  email: string;
  name: string;
  introduction: string;
  colors: string[];
  address: string;
  fruits: string[];
  courses: string[];
  emailSubscribe: boolean;
};

function App() {
  const [formData, setFormDataData] = useState<any>("");
  const { register, handleSubmit, control, formState, reset } = useForm<FormData>({
    defaultValues: {
      password: "",
      email: "",
      name: "",
      introduction: "",
      colors: [],
      address: "",
      fruits: [],
      courses: [],
    },
  });

  const onSubmit = handleSubmit((data) => {
    setFormDataData(data);
    console.log(data);
  });

  const colorOptions = [
    { label: "赤", value: "red" },
    { label: "青", value: "blue" },
    { label: "黄", value: "yellow" },
  ];

  const fruitOptions = [
    { label: "りんご", value: "apple" },
    { label: "みかん", value: "orange" },
    { label: "バナナ", value: "banana" },
  ];

  const addressOptions = [
    { label: "東京", value: "tokyo" },
    { label: "神奈川", value: "kanagawa" },
  ];

  const courseOptions = [
    { label: "デザイン", value: "design" },
    { label: "マーケティング", value: "marketing" },
    { label: "ライティング", value: "writing" },
  ];

  // 初期値を更新する例
  useEffect(() => {
    reset({
      password: "password",
      email: "email",
      name: "name",
      introduction: "introduction",
      colors: ["red", "yellow"],
      address: "tokyo",
      fruits: ["apple", "orange"],
      courses: ["design"],
      emailSubscribe: true,
    });
  }, []);

  return (
    <>
      <h1>TestForm</h1>
      <div className="data">
        <b>送信データ</b>
        {JSON.stringify(formData)}
      </div>

      <form onSubmit={onSubmit}>
        <section>
          <h2>非制御コンポーネントを扱う例</h2>
          <label htmlFor="password">パスワード</label>
          <input id="password" {...register("password", { required: "パスワードは必須です" })} type="password" />
          <p>{formState.errors.password?.message}</p>
        </section>

        <section>
          <h2>制御コンポーネントを扱う例</h2>
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

        <section>
          <h2>デザインシステム・非制御コンポーネントを扱う例</h2>
          <div>
            <TextInput label="名前" id="name" {...register("name", { required: "入力が必須です" })} />
            <p>{formState.errors.name?.message}</p>
          </div>
          <div>
            <Textarea
              label="自己紹介"
              id="introduction"
              {...register("introduction", { minLength: { value: 10, message: "10文字以上で入力してください" } })}
            />
            <p>{formState.errors.introduction?.message}</p>
          </div>
          <div>
            <LabeledForm label="好きな色">
              <CheckboxGroup horizontal>
                {colorOptions.map((option, index) => (
                  <Checkbox {...register("colors")} key={index} label={option.label} value={option.value} />
                ))}
              </CheckboxGroup>
            </LabeledForm>
          </div>
        </section>

        <section>
          <h2>デザインシステム・制御コンポーネントを扱う例</h2>
          <div>
            <Controller
              name="address"
              control={control}
              defaultValue={addressOptions[0].value}
              render={({ field }) => <Select label="住所" id="address" options={addressOptions} {...field} />}
            />
          </div>
          <div>
            <Controller
              name="fruits"
              rules={{ required: "必須です" }}
              control={control}
              render={({ field: { ref: _, ...field }, fieldState: { error } }) => {
                return (
                  <>
                    <CheckboxGroup horizontal>
                      <LabeledForm label="好きなフルーツ">
                        {fruitOptions.map((option, index) => (
                          <Checkbox
                            {...field}
                            key={index}
                            label={option.label}
                            value={option.value}
                            checked={field.value.includes(option.value)}
                            onChange={(e) => {
                              // field にセットする配列を準備
                              const value = [...field.value].filter((v) => v !== option.value);
                              if (e.target.checked) value.push(option.value);
                              // RHFによって送信される field の値を更新
                              field.onChange(value);
                            }}
                          />
                        ))}
                      </LabeledForm>
                    </CheckboxGroup>
                    <p>{error?.message}</p>
                  </>
                );
              }}
            />
          </div>
          <div>
            <p>Booleanを扱うチェックボックスの例</p>
            <Controller
              name="emailSubscribe"
              control={control}
              render={({ field: { ref: _, ...field }, fieldState: { error } }) => {
                return (
                  <Checkbox
                    {...field}
                    label="購読する？"
                    value={String(field.value)}
                    checked={field.value}
                    onChange={() => {
                      // RHFによって送信される field の値を更新
                      field.onChange(!field.value);
                    }}
                  />
                );
              }}
            />
          </div>
          <div>
            <Controller
              name="courses"
              control={control}
              render={({ field }) => (
                <LabeledForm label="受講コース">
                  <RadioGroup horizontal>
                    {courseOptions.map((option, index) => (
                      <Radio
                        {...field}
                        key={index}
                        label={option.label}
                        value={option.value}
                        onChange={(e) => {
                          field.onChange(e.target.value);
                        }}
                      />
                    ))}
                  </RadioGroup>
                </LabeledForm>
              )}
            />
          </div>
        </section>
        <button>送信</button>
      </form>
    </>
  );
}

export default App;
