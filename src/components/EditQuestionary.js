import React, { useEffect, useState } from "react";
import AppBar from "./AppBar";
import { getInformationOfQuestionary } from "../service/TeacherService";
import CreateQuestionary from "./CreateQuestionary";
import { useParams } from "react-router-dom";

export default function EditQuestionary(props) {
  const [questionary, setQuestionary] = useState();
  const [loading, setLoading] = useState(true);
  const { hash } = useParams();

  useEffect(() => {
    const informationPromise = getInformationOfQuestionary(
      hash
    );
    informationPromise.then((informationResponse) => {
      const information = informationResponse.data;
      setQuestionary(information);
      setLoading(false);
    });
  }, [hash]);

  return (
    <div>
      <AppBar position="static" />
      {loading ? (
        <div>Obteniendo información</div>
      ) : (
        <CreateQuestionary
          questionary={questionary}
          asEdit={true}
        />
      )}
    </div>
  );
}
