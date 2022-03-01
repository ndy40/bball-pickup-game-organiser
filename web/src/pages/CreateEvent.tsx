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
} from 'utilities/GlobalStyles';
import { useForm } from 'react-hook-form';
import { useCreateEvent } from 'hooks/event';
import moment from 'moment';
import { CreateEventInput } from '../services/EventService';

function CreateEvent() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const createEvent = useCreateEvent();
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
            {...register('title', {
              required: 'Title is required',
              minLength: 3,
            })}
          />
          <Error>{errors.max_players?.message}</Error>
        </FormGroup>
        <FormGroup>
          <Label>Date</Label>
          <Input
            {...register('session_date', {
              required: 'Date of event is required',
            })}
            type="datetime-local"
            min={moment().toISOString().slice(0, 16)}
          />
          <Error>{errors.session_date?.message}</Error>
        </FormGroup>
        <FormGroup>
          <Label>Maximum number of Players</Label>
          <Input
            {...register('max_players', {
              required: 'Number of players needed is required',
              min: {
                value: 1,
                message: 'Number of players must be greater than 1',
              },
            })}
            type="number"
            placeholder="Enter number of players"
            min={0}
          />
          <Error>{errors.max_players?.message}</Error>
        </FormGroup>
        <FormGroup>
          <Label>Venue</Label>
          <Input
            {...register('venue', { required: 'Venue is required' })}
            placeholder="Enter venue"
            list="venue"
            type="text"
          />
          <Error>{errors.venue?.message}</Error>
        </FormGroup>
        <FormGroup>
          <Label>Notes</Label>
          <TextArea
            {...register('notes', {
              required: 'Note is required',
              minLength: {
                value: 3,
                message: 'Note must be more than 3 characters',
              },
            })}
            placeholder="Enter note"
          />
          <Error>{errors.notes?.message}</Error>
        </FormGroup>
        <FormGroup>
          <Label>Cost ($)</Label>
          <Input
            {...register('cost', {
              required: 'Cost is required',
              min: {
                value: 1,
                message: 'Cost must be greater than 0',
              },
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
}

export default CreateEvent;
