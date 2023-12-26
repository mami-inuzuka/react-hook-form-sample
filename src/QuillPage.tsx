import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

type FormData = {
  description: string;
};

export const QuillPage = () => {
  const [formData, setFormDataData] = useState<any>("");
  const { handleSubmit, control } = useForm<FormData>({
    defaultValues: {
      description: "",
    },
  });

  const onSubmit = handleSubmit((data) => {
    setFormDataData(data);
    console.log(data);
  });

  return (
    <div>
      <h1>Quill</h1>
      <div className="data">
        <b>送信データ</b>
        <pre>{JSON.stringify(formData, null, "\t")}</pre>
      </div>
      <form onSubmit={onSubmit}>
        <section>
          <Controller
            name="description"
            control={control}
            render={({ field: { ref: _, ...field }, fieldState: { error } }) => {
              return (
                <ReactQuill
                  theme="snow"
                  value={field.value}
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                />
              );
            }}
          />
        </section>
        <button>送信</button>
      </form>
    </div>
  );
};
