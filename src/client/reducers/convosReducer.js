import { UPDATE_CONVO } from '../actions';

const ConvosReducer = (convos = [], action) => {
  switch (action.type) {
    case UPDATE_CONVO:
      const newConversation = action.data;
      const newConvos = convos.filter((conversation) => conversation.id !== newConversation.id);
      newConvos.push(newConversation);
      return newConvos;
    default:
      return convos;
  }
};

export default ConvosReducer;
