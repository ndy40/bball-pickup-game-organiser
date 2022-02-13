# exceptions thrown in this use case
class UserExistsError(ValueError):
    """
    Thrown when we search the DB and user already exists
    """

    pass


class UserNotFoundError(ValueError):
    """
    Thrown when we can't find the user during a login attempt
    """

    pass


class PlayerAlreadyJoined(ValueError):
    """
    Player has already joined
    """
    pass


class VenueAlreadyExists(ValueError):
    """
    Venue already exists in collection
    """
    pass
