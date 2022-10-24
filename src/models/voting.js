import {model as createModel, Schema} from 'mongoose';

export const VotingModel = createModel(
    'Voting',
    new Schema(
        {
            groupJid: Schema.Types.String,
            voters: Schema.Types.Array,
            description: Schema.Types.String,
            allowAdmin: Schema.Types.Boolean,
            duration: Schema.Types.Number,
            msgId: Schema.Types.String,
            polls: Schema.Types.Array,
        },
        {
            timestamps: {
                createdAt: true,
                updatedAt: true,
            },
        },
    ),
);
