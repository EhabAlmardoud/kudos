import { useState } from "react";
import _ from "lodash";
import { KudoForm } from "models/main.model";
import { postKudos } from "apis/apis";
import { useParams } from "react-router-dom";

const KudosViewer = () => {
  const params: any = useParams();

  const [form, setForm] = useState<KudoForm>({
    sender: "",
    message: "",
    receiver: "",
  });

  const renderNewKudoForm = () => {
    return (
      <div className="flex justify-around">
        <div className="flex gap-4">
          {renderFormTextInput("sender")}
          {renderFormTextInput("receiver")}
          {renderFormTextInput("message", "w-64")}
          <div className="flex justify-center items-center">
            <button onClick={handlePostKudos}>Submit Kudos</button>
          </div>
        </div>
      </div>
    );
  };

  const renderFormTextInput = (key: keyof KudoForm, inputWidth?: string) => {
    return (
      <div className="flex flex-col gap-y-2 items-start">
        <div>{_.upperFirst(key)}:</div>
        <input
          type="text"
          className={`outline-violet-100 shadow-lg ${inputWidth}`}
          value={form?.[key]}
          onChange={(event) =>
            setForm({ ...form, [key]: event?.target?.value })
          }
        />
      </div>
    );
  };

  const handlePostKudos = () => {
    postKudos(params?.public_id, form?.sender, form?.receiver, form?.message);
  };

  return <div>{renderNewKudoForm()}</div>;
};

export default KudosViewer;
