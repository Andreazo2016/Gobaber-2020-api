import { MigrationInterface, QueryRunner, TableColumn,TableForeignKey } from "typeorm";

export class AlterProviderFieldToProviderId1589908808843 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {

        /**Remove o antigo campo */
        await queryRunner.dropColumn('appointments', 'provider');

        /**Adiciona uma nova coluna */
        await queryRunner.addColumn('appointments', new TableColumn({
            name:'provider_id',
            type:'uuid',
            isNullable:true
        }));

        /**Cria a chave estrangeira */
        await queryRunner.createForeignKey('appointments',new TableForeignKey({
            name:'AppointmentProvider',
            columnNames:['provider_id'],
            referencedColumnNames:['id'],
            referencedTableName:'users',
            onDelete:'SET NULL',
            onUpdate:'CASCADE'
        }))


    }

    public async down(queryRunner: QueryRunner): Promise<any> {

        await queryRunner.dropForeignKey('appointments','AppointmentProvider');

        await queryRunner.dropColumn('appointments', 'provider_id');

        await queryRunner.addColumn('appointments', new TableColumn({
            name:'provider',
            type:'varchar'
        }));

    }

}
