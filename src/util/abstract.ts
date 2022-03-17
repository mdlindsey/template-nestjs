import { Exclude } from 'class-transformer'
import {
    CreateDateColumn,
    UpdateDateColumn,
    AbstractRepository,
    InsertResult,
    DeleteDateColumn,
    UpdateResult,
    DeleteResult
} from 'typeorm'

export abstract class BaseEntity {
    @Exclude()
    @CreateDateColumn({ name: 'created_datetime' })
    createdDateTime?: Date

    @Exclude()
    @UpdateDateColumn({ name: 'updated_datetime' })
    updatedDateTime?: Date

    @Exclude()
    @DeleteDateColumn({ name: 'deleted_datetime' })
    deletedDateTime?: Date
}

export abstract class BaseRepository<T> extends AbstractRepository<T> {
    public query() {
        return this.repository.createQueryBuilder()
    }
    public async save(entity:T): Promise<T> {
        return this.repository.save({ ...entity, deletedDateTime: null })
    }
    public async delete(entity:Partial<T>): Promise<DeleteResult> {
        return this.repository.delete(<T>entity)
    }
    public async softDelete(entity:Partial<T>): Promise<UpdateResult> {
        return this.repository.softDelete(<T>entity)
    }
    public async insert(entity:T): Promise<InsertResult> {
        return this.repository.insert(entity)
    }
    public async findOne(criteria:Partial<T>): Promise<T> {
        return <Promise<T>>this.repository.findOne(criteria)
    }
    public async findAll(criteria:Partial<T>): Promise<T[]> {
        return this.repository.find(criteria)
    }
}


