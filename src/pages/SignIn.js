import { Alert, Button, Col, Container, Grid, Icon, Panel, Row } from "rsuite"
import { auth, database } from "../misc/firebase"
import firebase from "firebase/app"

const SignIn = () => {

    const signInWithProvider=async(provider)=>{
        try {
            const {additionalUserInfo,user}=await auth.signInWithPopup(provider);

            if(additionalUserInfo.isNewUser){
                await database.ref(`/profiles/${user.uid}`).set({
                    name: user.displayName,
                    createdAt: firebase.database.ServerValue.TIMESTAMP
                })
            }
            
            Alert.success('Signed in',4000);
        } catch (error) {
            Alert.error(error.message,4000)
        }
        
    }

    const onGoogleSignIn=()=>{
        signInWithProvider(new firebase.auth.GoogleAuthProvider())
    }

    // const onFacebookSignIn=()=>{
    //     signInWithProvider(new firebase.auth.FacebookAuthProvider())
    // }

  return (
    <Container>
        <Grid className="mt-page">
            <Row>
                <Col xs={24} md={12} mdOffset={6}>
                    <Panel>
                        <div className="text-center">
                            <h2>Welcome to Chat</h2>
                            <p>Progressive chat platform for neophytes</p>
                        </div>

                        <div className="mt-3">
                            <Button block color="green" onClick={onGoogleSignIn}>
                                <Icon icon="google"/> Continue with Google
                            </Button>
                            // <Button block color="blue" onClick={onFacebookSignIn}>
                            //     <Icon icon="facebook"/> Continue with Facebook
                            // </Button>
                        </div>
                    </Panel>
                </Col>
            </Row>
        </Grid>
    </Container>
  )
}

export default SignIn
