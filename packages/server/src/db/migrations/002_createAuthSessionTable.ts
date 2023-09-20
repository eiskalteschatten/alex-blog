import { QueryInterface, DataTypes as DataTypesNamespace } from 'sequelize';

export default {
  up: async (query: QueryInterface, DataTypes: typeof DataTypesNamespace): Promise<void> => {
    try {
      const tableDesc = await query.describeTable('auth_sessions');
      if (tableDesc['id']) return Promise.resolve();
    }
    catch (error) {
      // Silently fail because the table most likely doesn't exist and will be
      // created later
    }

    return query.createTable('auth_sessions', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
      },
      sessionId: {
        type: new DataTypes.STRING,
        allowNull: false,
        field: 'session_id',
      },
      token: {
        type: new DataTypes.STRING(1000),
        allowNull: false,
        unique: true,
      },
      tokenType: {
        type: new DataTypes.ENUM('access', 'refresh', 'temp'),
        allowNull: false,
        field: 'token_type',
      },
      tokenUUID: {
        type: new DataTypes.STRING,
        allowNull: false,
        unique: true,
        field: 'token_uuid',
      },
      expirationDate: {
        type: new DataTypes.DATE,
        allowNull: false,
        field: 'expiration_date',
      },
      fkUser: {
        type: new DataTypes.INTEGER,
        allowNull: false,
        field: 'fk_user',
        references: {
          model: {
            tableName: 'users',
          },
          key: 'id',
        },
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    });
  },

  down: async (query: QueryInterface): Promise<void> => {
    return query.dropTable('auth_sessions');
  },
};
