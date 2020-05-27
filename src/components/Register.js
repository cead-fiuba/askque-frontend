import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import { default as AppBar2 } from "@material-ui/core/AppBar";
import { Teach } from "mdi-material-ui";
import School from "@material-ui/icons/School";
import Person from "@material-ui/icons/Person";
import Avatar from "@material-ui/core/Avatar";
import RegisterStudent from "./RegisterStudent";
import RegisterTeacher from "./RegisterTeacher";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Box boxShadow={3}>
      <Typography
        component="div"
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
        style={{ width: "100%" }}
      >
        <Box p={3}>{children}</Box>
      </Typography>
    </Box>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  appBar: {
    marginTop: theme.spacing(2),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
}));

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Register() {
  //const classes = useStyles();
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }
  const classes = useStyles();
  return (
    <div>
      <Container component="main" maxWidth="xs" style={{ marginTop: "3%" }}>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <Person />
          </Avatar>
          <Typography component="h1" variant="h5">
            Crear cuenta
          </Typography>
          <AppBar2 position="static" className={classes.appBar}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="simple tabs example"
              centered
            >
              <Tab label="Estudiante" {...a11yProps(0)} icon={<School />} />
              <Tab label="Docente" {...a11yProps(1)} icon={<Teach />} />
            </Tabs>
          </AppBar2>
          <TabPanel value={value} index={0}>
            <RegisterStudent />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <RegisterTeacher />
          </TabPanel>
        </div>
      </Container>
    </div>
  );
}
