import { container } from "tsyringe";
import { ITeamService } from "./services/TeamService.interface";
import TeamService from "./services/TeamService";

container.register<ITeamService>("ITeamService", {
  useClass: TeamService,
});

export { container };
