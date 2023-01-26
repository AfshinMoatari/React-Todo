import { ThemeProvider } from "@emotion/react";
import ListAltIcon from '@mui/icons-material/ListAlt';
import { CssBaseline, AppBar, Toolbar, Typography, Box, Container, Stack, Button, Grid, Card, CardMedia, CardContent, CardActions, createTheme, makeStyles, TextField, Paper, IconButton } from "@mui/material";
import { FC} from "react";
import { RouteComponentProps } from "react-router-dom";
import {useQuery} from 'react-query'
import axios from 'axios'
import AddIcon from '@mui/icons-material/Add';
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";

const theme = createTheme();
interface ITodoFormInputs {
  subject: string;
}
const TodoFormSchema = yup.object().shape({
  subject : yup.string()
  .required()
  .min(5, 'Must be more than 5 digits')
})

type TasksComponentProps = RouteComponentProps;
const Tasks: FC<TasksComponentProps> = ({ history }): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ITodoFormInputs>({
    resolver: yupResolver(TodoFormSchema)
  });

  const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("auth")}` }
  };

  async function fetchTasks(this: any){
    const {data} = await axios.get(`https://localhost:7008/api/Task/TaskList?id=${localStorage.getItem("id")}`, config) 
    return data
  }

  const handleCreateClick: SubmitHandler<ITodoFormInputs> = async (data: ITodoFormInputs) => {
    let params = {
      userId: localStorage.getItem("id"),
      subject: data.subject,
    };
    await axios
      .post("https://localhost:7008/api/Task/CreateTask", params, config)
      refetch();
  }

  async function handleDeleteClick (event: { currentTarget: { id: any; }; }) {
     await axios.get(`https://localhost:7008/api/Task/DeleteTask?id=${event.currentTarget.id}`, config)
     refetch();
  };
  const {data, error, isError, isLoading, refetch } = useQuery('posts', fetchTasks); 

  if(isLoading){
      return <div>Loading...</div>
  }
  if(isError){
      return <div>Error!</div>
  }
  const logout = () => {
    localStorage.clear();
    history.push("/login");
  };


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
        <ListAltIcon sx={{ mr: 2 }} />
        <Typography variant="h6" color="inherit" noWrap  sx={{ flexGrow: 1 }}>
            To Do List
          </Typography>
          <Button color="inherit" onClick={logout}>Log Out</Button>
        </Toolbar>
      </AppBar>
      <main>
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Hello {localStorage.getItem("username")}👋
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              You currently have {data.length} active tasks.
            </Typography>
            <Box component="form" onSubmit={handleSubmit(handleCreateClick)} noValidate sx={{ mt: 1 }}>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Grid container spacing={1}>
                <Grid item xs={9}>
                  <TextField
                    margin="normal"
                    variant="filled"
                    fullWidth
                    required
                    id="todo"
                    label="Todo description"
                    autoComplete="todo"
                    autoFocus
                    error={!!errors.subject}
                    helperText={errors.subject ? errors.subject?.message : ''}
                    {...register("subject")}
                  />
                </Grid>
                <Grid item xs={3}>
                  <Button  type="submit" variant="contained" startIcon={<AddIcon />} style={{margin:"18px 0 0 10px", height: "65%"}}>
                    Add
                  </Button>
                </Grid>
              </Grid>
            </Stack>
            </Box>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
        <Box sx={{ flexGrow: 1, overflow: 'hidden', px: 3 }}>
          {data?.map((c: {
            creationDate: Date;
            subject: string;
            id: string;
          }) => (
            <>
            <Paper
              sx={{
                p: 2,
                margin: 'auto',
                maxWidth: 700,
                flexGrow: 1,
                backgroundColor: (theme) =>
                  theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
              }}
              style={{margin:"15px 0"}} >
              <Grid container spacing={2}>
                <Grid item xs={12} sm container>
                  <Grid item xs container direction="column" spacing={4}>
                    <Grid item xs>
                      <Typography variant="body2" gutterBottom >
                        {c.subject}
                      </Typography>
                    </Grid>
                    <Grid item sm container spacing={2} direction="row">
                      <Grid item xs={11}>
                        <Typography variant="body2" color="text.secondary">
                            Creation Date: {
                              new Date(c.creationDate).toLocaleDateString("en-GB", {
                                day: "numeric",
                                month: "long",
                                year: "numeric"
                              })
                            }
                        </Typography>
                      </Grid>
                      <Grid item xs={1}>
                        <Typography sx={{ cursor: 'pointer' }} variant="body2">
                          <Button id={c.id} onClick={handleDeleteClick}>Remove</Button>
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
            </>
          ))}
        </Box>
        </Container>
      </main>
    </ThemeProvider>
  );
}

export default Tasks;
