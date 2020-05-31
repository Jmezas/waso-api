import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Role } from './local/role.entity';

@Injectable()
export class RoleService {
  constructor(
    @Inject('ROLE_REPOSITORY')
    private roleRepository: Repository<Role>,
  ) {}

  async findAll(): Promise<Role[]> {
    return this.roleRepository.find();
  }

  async find(id: string): Promise<Role> {
    return this.roleRepository.findOne(id);
  }

  async create(role: Role) {
    return this.roleRepository.save(role);
  }

  async update(id: string, role: Role) {

    let roleDb: Role =  await this.roleRepository.findOne(id);

    return await this.roleRepository.update(id, roleDb);

  }

  async delete(id: string) {

    let roleDb: Role = await this.roleRepository.findOne(id);

    return await this.roleRepository.delete(roleDb);
  }
}
