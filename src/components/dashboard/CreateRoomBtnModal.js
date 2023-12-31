import { useCallback, useRef, useState } from "react";
import { useModalState } from "../../misc/customHooks"
import { Alert, Button, ControlLabel, Form, FormControl, FormGroup, Icon, Modal, Schema } from "rsuite";
import firebase from "firebase/app";
import { auth, database } from "../../misc/firebase";

const {StringType}=Schema.Types;
const model=Schema.Model({
    name:StringType().isRequired('Chat name is required'),
    description:StringType().isRequired('Description is required')
})

const INITIAL_FORM={
    name:'',
    description:''
}

const CreateRoomBtnModal = () => {
    const {isOpen,open,close}=useModalState();
    const [formValue,setFormvalue]=useState(INITIAL_FORM);
    const [isLoading,setIsLoading]=useState(false);
    const fromRef=useRef();

    const onFormChange= useCallback( value=>{
        setFormvalue(value);
    },[])

    const onSubmit=async()=>{
        if(!fromRef.current.check()){
            return;
        }

        setIsLoading(true);

        const newRoomdata={
            ...formValue,
            createdAt:firebase.database.ServerValue.TIMESTAMP,
            admins:{
                [auth.currentUser.uid]:true
            }
        }

        try {
            await database.ref('rooms').push(newRoomdata);
            Alert.info(`${formValue.name} has been created`,4000)
            setIsLoading(false);
            setFormvalue(INITIAL_FORM)
            close();
        } catch (error) {
            setIsLoading(false)
            Alert.error(error.message,4000)
        }
    }

  return (
    <div className="mt-1">
      <Button block color="green" onClick={open}>
        <Icon icon="creative"/> Create new chat room
      </Button>

      <Modal show={isOpen} onHide={close}>
        <Modal.Header>
            <Modal.Title>New chat room</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form fluid onChange={onFormChange} formValue={formValue} model={model} ref={fromRef}>
                <FormGroup>
                    <ControlLabel>Room name</ControlLabel>
                    <FormControl name="name" placeholder="Enter chat room name..."/>
                </FormGroup>

                <FormGroup>
                    <ControlLabel>Description</ControlLabel>
                    <FormControl componentClass="textarea" rows={5} name="description" placeholder="Enter room description" />
                </FormGroup>
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button block appearance="primary" onClick={onSubmit} disabled={isLoading}>Create new chat room</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default CreateRoomBtnModal
