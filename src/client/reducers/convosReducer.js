import { UPDATE_CONVO } from '../actions';

const ConvosReducer = (convos = [], action) => {
  switch (action.type) {
    case UPDATE_CONVO:
      const newConversation = action.payload;
      const newConvos = convos.filter((conversation) => conversation.id !== newConversation.id);
      newConvos.push(conversation);
      return newConvos;
    default:
      return convos;
  }
};

export default ConvosReducer;
