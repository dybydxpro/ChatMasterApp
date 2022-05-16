import * as React from 'react';
import { StyleSheet, View, ImageBackground } from 'react-native';
import Services from './../Services';
import bgImage from './../image/1026253.jpg';

import Fab from '@mui/material/Fab';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { blue } from '@mui/material/colors';

import PersonIcon from '@mui/icons-material/Person';

export default function Home(){
    const [openLogin, setOpenLogin] = React.useState(false);
    const [openRegister, setOpenRegister] = React.useState(false);
    const [login, setLogin] = React.useState({});
    const [register, setRegister] = React.useState({});

    const handleLoginOpen = () => {
        setOpenLogin(true);
    };

    const handleLoginClose = () => {
        setOpenLogin(false);
    };

    const handleRegisterOpen = () => {
        setOpenRegister(true);
    };

    const handleRegisterClose = () => {
        setOpenRegister(false);
    };

    function loginHandle(e){
        const newData = {...login};
        newData[e.target.id] = e.target.value;
        setLogin(newData);
        console.log(newData);
    }

    function registerHandle(e){
        const newData = {...register};
        newData[e.target.id] = e.target.value;
        setRegister(newData);
        console.log(newData);
    }

    function loginValidate(){
        const newData = {...login};
        if((newData["email"] == "" ) || (newData["email"] == undefined )){
            console.log("email");
            return false;
        }
        else if((newData["password"] == "" ) || (newData["password"] == undefined )){
            console.log("password");
            return false;
        }
        else{
            return true;
        }
    }

    function Login(){
        if(loginValidate() == true){
            Services.Login(login)
            .then(({data}) => {
                console.log(data);
                sessionStorage.setItem("userId", data.authId);
                sessionStorage.setItem("name", data.name);
                window.location.replace("/chat");
            })
            .catch(({response}) =>{
                console.log(response);
            })
        }
        else{
            console.log("validation faild!");
        }
    }

    function registerValidate(){
        const newData = {...register};
        if((newData["name"] == "" ) || (newData["name"] == undefined )){
            console.log("name");
            return false;
        }
        else if((newData["email"] == "" ) || (newData["email"] == undefined )){
            console.log("email");
            return false;
        }
        else if((newData["password"] == "" ) || (newData["password"] == undefined )){
            console.log("password");
            return false;
        }
        else{
            return true;
        }
    }

    function Register(){
        if(registerValidate() == true){
            Services.Register(register)
            .then(({data}) => {
                handleRegisterClose();
                handleLoginOpen();
                console.log(data);
            })
            .catch(({response}) =>{
                console.log(response);
            })
        }
        else{
            console.log("validation faild!");
        }
    }

    return(
        <View>
            <ImageBackground source={bgImage} resizeMode="cover" style={styleHome.bg}>
                <Fab color="primary" aria-label="Your acount" sx={{ position: 'fixed', top: '15px', right: '15px' }} onClick={handleLoginOpen}>
                    <PersonIcon sx={{fontSize: '36px'}}/>
                </Fab>

                <Dialog open={openLogin} onClose={handleLoginClose} maxWidth="xs">
                    <DialogTitle>Login</DialogTitle>
                    <DialogContent>
                        <FormControl sx={{ mt: 2, mb: 1, mx: 8 }}>
                            <TextField required id="email" value={login.email} onChange={(e) => loginHandle(e)} label="Email" sx={{ width: 250}} placeholder="john@email.com" variant="filled" />
                        </FormControl>
                        <FormControl sx={{ mt: 2, mb: 1, mx: 8 }}>
                            <TextField required id="password" value={login.password} onChange={(e) => loginHandle(e)} label="Password" sx={{ width: 250}} variant="filled" type="password"/>
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => {handleLoginClose(); handleRegisterOpen();}}>Register</Button>
                        <Button onClick={() => Login()} variant="contained" sx={{ backgroundColor: blue[500], '&:hover': { backgroundColor: blue[700]} }}>Login</Button>
                    </DialogActions>
                </Dialog>

                <Dialog open={openRegister} onClose={handleRegisterClose} maxWidth="xs">
                    <DialogTitle>Register</DialogTitle>
                    <DialogContent>
                        <FormControl sx={{ mt: 2, mb: 1, mx: 8 }}>
                            <TextField required id="name" value={register.name} onChange={(e) => registerHandle(e)} label="Name" sx={{ width: 250}} placeholder="John Smith" variant="filled" />
                        </FormControl>
                        <FormControl sx={{ mt: 2, mb: 1, mx: 8 }}>
                            <TextField required id="email" value={register.email} onChange={(e) => registerHandle(e)} label="Email" sx={{ width: 250}} placeholder="john@email.com" variant="filled" />
                        </FormControl>
                        <FormControl sx={{ mt: 2, mb: 1, mx: 8 }}>
                            <TextField required id="password" value={register.password} onChange={(e) => registerHandle(e)} label="Password" sx={{ width: 250}} variant="filled" type="password"/>
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => {handleRegisterClose(); handleLoginOpen();}}>Login</Button>
                        <Button onClick={() => Register()} variant="contained" sx={{ backgroundColor: blue[500], '&:hover': { backgroundColor: blue[700]} }}>Register</Button>
                    </DialogActions>
                </Dialog>
            </ImageBackground>
        </View>
    );
}

const styleHome = StyleSheet.create({
    bg: {
        backgroundPosition: 'center center', 
        height: '100vh',
        width: '100%'
    }
});