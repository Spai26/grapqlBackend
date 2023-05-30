import { GraphQLError } from 'graphql';

export const customMessageErrors = (
  message = 'Algo inesperado sucedio',
  code = 'BAD_REQUEST',
  status = 404
) => {
  return new GraphQLError(message, {
    extensions: {
      code,
      http: { status }
    }
  });
};

export const handlerHttpError = (message) => {
  return new GraphQLError(message, {
    extensions: {
      code: 'something unexpected happened, try again',
      http: { status: 404 }
    }
  });
};

export const handlerErrorAuth = (message) => {
  return new GraphQLError(message, {
    extensions: {
      code: 'UNAUTHENTICATED',
      http: { status: 401 }
    }
  });
};
