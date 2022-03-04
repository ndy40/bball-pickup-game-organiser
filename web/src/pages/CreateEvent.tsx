import { useForm } from 'react-hook-form';
import { useCreateEvent } from 'hooks/event';
import moment from 'moment';
import { useLocation } from 'react-router-dom';
import { CreateEventInput } from '../services/EventService';

function CreateEvent() {
  const { state } = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      title: state?.event.title || '',
      venue: state?.event.title || '',
      cost: state?.event.cost || '',
      max_players: state?.event.max_players,
      notes: state?.event.notes,
    },
  });
  const createEvent = useCreateEvent();
  const onValid = (data: CreateEventInput) => {
    createEvent(data);
  };

  return (
    <div className="h-full w-full">
      <h2 className="mb-4 text-center text-3xl font-semibold">Add Event</h2>
      <form className="form grid gap-5" onSubmit={handleSubmit(onValid)}>
        <div>
          <label className="label" htmlFor="title">
            Title
          </label>
          <input
            id="title"
            className="input"
            {...register('title', {
              required: 'Title is required',
              minLength: 3,
            })}
            placeholder="Enter title"
          />
          <span className="error">{errors.title?.message}</span>
        </div>
        <div>
          <label className="label " htmlFor="venue">
            Venue
          </label>
          <input
            id="venue"
            className="input"
            {...register('venue', { required: 'Venue is required' })}
            placeholder="Enter venue"
            type="text"
          />
          <span className="error">{errors.venue?.message}</span>
        </div>
        <div>
          <label className="label" htmlFor="date">
            Date
          </label>
          <input
            id="date"
            className="input"
            {...register('session_date', {
              required: 'Date of event is required',
            })}
            type="datetime-local"
            min={moment().toISOString().slice(0, 16)}
          />
          <span className="error">{errors.session_date?.message}</span>
        </div>
        <div>
          <label className="label" htmlFor="cost">
            Cost
          </label>
          <input
            id="cost"
            className="input"
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
          <span className="error">{errors.cost?.message}</span>
        </div>
        <div>
          <label className="label" htmlFor="max_players">
            Number of slots
          </label>
          <input
            className="input"
            id="max_players"
            {...register('max_players', {
              required: 'Number of players needed is required',
              min: {
                value: 1,
                message: 'Number of players must be greater than 1',
              },
            })}
            type="number"
            placeholder="Enter number of slots"
            min={0}
            step={1}
          />
          <span className="error">{errors.max_players?.message}</span>
        </div>
        <div>
          <label className="label" htmlFor="note">
            Note
          </label>
          <textarea
            id="note"
            className="input resize-y"
            {...register('notes', {
              required: 'Note is required',
              minLength: {
                value: 3,
                message: 'Note must be more than 3 characters',
              },
            })}
            placeholder="Enter note"
          />
          <span className="error">{errors.notes?.message}</span>
        </div>
        <div>
          <button disabled={!isValid} type="submit" className="btn btn-primary">
            Create an event
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateEvent;
