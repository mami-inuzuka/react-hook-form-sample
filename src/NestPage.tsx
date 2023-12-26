import { TextInput } from "@sheinc/shelikes-design-system";
import { useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";

type FormData = {
  checkPoints: { title: string; description: string }[];
  classMates: { name: string; age: string }[];
};

export const NextPage = () => {
  const [formData, setFormDataData] = useState<any>("");
  const { register, handleSubmit, control } = useForm<FormData>({
    defaultValues: {
      checkPoints: [],
      classMates: [],
    },
  });

  const onSubmit = handleSubmit((data) => {
    setFormDataData(data);
    console.log(data);
  });

  const {
    fields: checkPointsFields,
    remove: checkPointsRemove,
    append: checkPointsAppend,
  } = useFieldArray({
    name: "checkPoints",
    control,
  });

  const {
    fields: classMatesFields,
    remove: classMatesRemove,
    append: classMatesAppend,
  } = useFieldArray({
    name: "classMates",
    control,
  });

  return (
    <div>
      <h1>ネスト</h1>
      <div className="data">
        <b>送信データ</b>
        <pre>{JSON.stringify(formData, null, "\t")}</pre>
      </div>
      <form onSubmit={onSubmit}>
        <section>
          <h2>ネスト / register</h2>
          <pre>
            fields:
            {JSON.stringify(checkPointsFields, null, "\t")}
          </pre>
          {checkPointsFields.map((field, i) => (
            <div key={field.id}>
              <button type="button" onClick={() => checkPointsRemove(i)}>
                削除
              </button>
              <input {...register(`checkPoints.${i}.title` as const)} />
              <input {...register(`checkPoints.${i}.description` as const)} />
            </div>
          ))}
          <button type="button" onClick={() => checkPointsAppend({ title: "title", description: "description" })}>
            append
          </button>
        </section>

        <section>
          <h2>ネスト / Controller</h2>

          <pre>
            fields:
            {JSON.stringify(classMatesFields, null, "\t")}
          </pre>
          {classMatesFields.map((field, i) => (
            <div key={field.id}>
              <button type="button" onClick={() => classMatesRemove(i)}>
                {i}を削除
              </button>
              <Controller
                name={`classMates.${i}.name`}
                control={control}
                render={({ field }) => <TextInput label="名前" layout="horizontal" {...field} />}
              />
              <Controller
                name={`classMates.${i}.age`}
                control={control}
                render={({ field }) => <TextInput label="年齢" layout="horizontal" {...field} />}
              />
            </div>
          ))}
          <button type="button" onClick={() => classMatesAppend({ name: "Taro", age: "20" })}>
            append
          </button>
        </section>
        <button>送信</button>
      </form>
    </div>
  );
};
