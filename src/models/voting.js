import {model as createModel, Schema} from 'mongoose';

export const VotingModel = createModel(
    'Voting',
    new Schema(
        {
            id: Schema.Types.ObjectId,
            groupJid: Schema.Types.String,
            voters: Schema.Types.Array,
            description: Schema.Types.String,
            allowAdmin: Schema.Types.Boolean,
            duration: Schema.Types.Number,
        },
        {
            timestamps: {
                createdAt: true,
                updatedAt: true,
            },
        },
    ),
);
