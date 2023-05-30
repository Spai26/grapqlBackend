import { GraphQLError } from 'graphql';
export const handlerHttpError = (
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

export const handlerErrorAuth = (message) => {
  return new GraphQLError(message, {
    extensions: {
      code: 'UNAUTHENTICATED',
      http: { status: 401 }
    }
  });
};
