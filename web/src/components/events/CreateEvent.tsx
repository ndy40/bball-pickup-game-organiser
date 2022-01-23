import React from "react";
import {
  Button,
  Container,
  Error,
  Form,
  FormGroup,
  Input,
  Label,
  Text,
  TextArea,
} from "../../uitls/GlobalStyles";
import { useForm } from "react-hook-form";
<<<<<<< HEAD
import { useCreateEvent } from "./hooks";
=======
import { useCreateForm } from "./hooks/use-events";
>>>>>>> 5085bf2176408a092041e8c0c989bb5d99a5f767
import { CreateEventInput } from "../../services/EventService";
import moment from "moment";

const CreateEvent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
<<<<<<< HEAD
  const createEvent = useCreateEvent();
=======
  const createEvent = useCreateForm();
>>>>>>> 5085bf2176408a092041e8c0c989bb5d99a5f767
  const onValid = (data: CreateEventInput) => {
    createEvent(data);
  };

  return (
    <Container className="">
      <Text>Add Event</Text>

      <Form onSubmit={handleSubmit(onValid)}>
        <FormGroup>
          <Label>Title</Label>
          <Input
<<<<<<< HEAD
            {...register("title", {
              required: "Title is required",
              minLength: 3,
            })}
=======
              {...register('title',{
                required:'Title is required',
                minLength:3
              })}
              placeholder="Enter title"
>>>>>>> 5085bf2176408a092041e8c0c989bb5d99a5f767
          />
          <Error>{errors.max_players?.message}</Error>
        </FormGroup>
        <FormGroup>
          <Label>Date</Label>
          <Input
            {...register("session_date", {
              required: "Date of event is required",
<<<<<<< HEAD
=======

>>>>>>> 5085bf2176408a092041e8c0c989bb5d99a5f767
            })}
            type="datetime-local"
            min={moment().toISOString().slice(0, 16)}
          />
          <Error>{errors.session_date?.message}</Error>
        </FormGroup>
        <FormGroup>
          <Label>Maximum number of Players</Label>
          <Input
<<<<<<< HEAD
            {...register("max_players", {
              required: "Number of players needed is required",
              min: {
                value: 1,
                message: "Number of players must be greater than 1",
              },
            })}
=======
              {...register('max_players',{
                required:'Number of players needed is required',
                min:{
                  value:1,
                  message:"Number of players must be greater than 1"
                }
              })}
>>>>>>> 5085bf2176408a092041e8c0c989bb5d99a5f767
            type="number"
            placeholder="Enter number of players"
            min={0}
          />
          <Error>{errors.max_players?.message}</Error>
        </FormGroup>
        <FormGroup>
          <Label>Venue</Label>
<<<<<<< HEAD
          <Input
            {...register("venue", { required: "Venue is required" })}
            placeholder="Enter venue"
            list="venue"
            type="text"
          />
=======
          <Input {...register("venue",
              {required:"Venue is required"})}
                 placeholder="Enter venue" list="venue" type="text"  />
>>>>>>> 5085bf2176408a092041e8c0c989bb5d99a5f767
          <datalist id="venue">
            <option value="Edge" />
            <option value="Firefox" />
            <option value="Chrome" />
            <option value="Opera" />
            <option value="Safari" />
          </datalist>
          <Error>{errors.venue?.message}</Error>
        </FormGroup>
        <FormGroup>
          <Label>Notes</Label>
<<<<<<< HEAD
          <TextArea
            {...register("notes", {
              required: "Note is required",
              minLength: {
                value: 3,
                message: "Note must be more than 3 characters",
              },
            })}
            placeholder="Enter note"
          ></TextArea>
=======
          <TextArea {...register("notes",{
            required:"Note is required",
            minLength:{
              value:3,
              message:"Note must be more than 3 characters"
            }

          })} placeholder="Enter note"></TextArea>
>>>>>>> 5085bf2176408a092041e8c0c989bb5d99a5f767
          <Error>{errors.notes?.message}</Error>
        </FormGroup>
        <FormGroup>
          <Label>Cost ($)</Label>
          <Input
<<<<<<< HEAD
            {...register("cost", {
              required: "Cost is required",
              min: {
                value: 1,
                message: "Cost must be greater than 0",
              },
=======
            {...register("cost",{
              required:"Cost is required",
              min:{
                value:1,
                message:"Cost must be greater than 0"
              }
>>>>>>> 5085bf2176408a092041e8c0c989bb5d99a5f767
            })}
            type="number"
            min="0.00"
            max="10000.00"
            step="0.01"
            placeholder="Enter amount"
          />
          <Error>{errors.cost?.message}</Error>
        </FormGroup>
        <FormGroup>
          <Button>Create Event</Button>
        </FormGroup>
      </Form>
    </Container>
  );
};

export default CreateEvent;
