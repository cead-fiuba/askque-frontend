import server from "../Server";

export const createTeacher = (teacher) => {
  return server.post("/teachers", teacher);
};

export const findTeacherByEmail = (email) => {
  return server.get(`/teachers/${email}`);
};

export const getAskquesOfTeacher = () => {
  return server.get("/questionaries");
};

export const getInformationOfQuestionary = (hash) => {
  return server.get(`/questionaries/${hash}`);
};

export const getInformationOfQuestionaryWithCache = (hash) => {
  return server.get(`/questionaries/${hash}`, { headers: { "X-Cache": true } });
};

export const saveQuestionary = (questionary) => {
  console.log("questionary", questionary);
  return server.post("/questionaries", questionary);
};

export const getResultOfQuestionary = (hash) => {
  console.log(`Get result of questionary ${hash}`);
  return server.get(
    `/responses?questionary_hash=${hash}&with_answers=true&process=false`
  );
};

export const deleteQuestionaryByHash = (hash) => {
  console.log(`Delete questionary ${hash}`);
  return server.delete(`/questionaries/${hash}`);
};

export const makeCopyOfQuestionaryWith = (
  withMe,
  userEmail,
  questionaryHash
) => {
  const body = {
    questionary_hash: questionaryHash,
    with_me: withMe,
    user_email: userEmail,
  };
  return server.post("/copy", body);
};

export const isAdmin = () => {
  return server.get("/admin");
};
