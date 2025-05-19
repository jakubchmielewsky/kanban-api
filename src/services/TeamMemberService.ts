import { TeamMemberRepository } from "../repositories/repositories";

class TeamMemberService {
  findAll(filter: any) {
    return TeamMemberRepository.findAll(filter);
  }

  findById(id: string) {
    return TeamMemberRepository.findById(id);
  }

  create(data: any) {
    return TeamMemberRepository.create(data);
  }

  update(id: string, updates: any) {
    return TeamMemberRepository.update(id, updates);
  }

  remove(id: string) {
    return TeamMemberRepository.delete(id);
  }
}

export default new TeamMemberService();
