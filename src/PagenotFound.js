import { Container } from "react-bootstrap";

const PageNotFound = () =>{

    return(
       <Container style={{
        height:"50vh",
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        flexDirection:"column",
        color:"red"
       }}>

        <h1>ERROR : 404</h1>
        <h2>Page Not Found</h2>

       </Container>
    )

}

export default PageNotFound;