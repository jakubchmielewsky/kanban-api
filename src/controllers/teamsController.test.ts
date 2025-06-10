import "reflect-metadata";
import { container } from "../../src/container";
import { TeamsController } from "../../src/controllers/teamsController";
import { ITeamService } from "../../src/services/TeamService.interface";

describe("TeamsController", () => {
  let controller: TeamsController;
  let mockService: jest.Mocked<ITeamService>;

  beforeEach(() => {
    mockService = {
      findAll: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };

    container.register<ITeamService>("ITeamService", {
      useValue: mockService,
    });

    controller = container.resolve(TeamsController);
  });

  test("getUserTeams returns teams", async () => {
    const mockTeams = [{ name: "Team A" }, { name: "Team B" }];
    mockService.findAll.mockResolvedValue(mockTeams as any);

    const req = { user: { id: "user123" } } as any;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any;

    await controller.getUserTeams(req, res, jest.fn());

    expect(mockService.findAll).toHaveBeenCalledWith("user123");
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: "success",
      data: mockTeams,
    });
  });

  test("createTeam creates a team", async () => {
    const mockTeam = { name: "New Team" };
    mockService.create.mockResolvedValue(mockTeam as any);

    const req = { user: { id: "user123" }, body: mockTeam } as any;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any;

    await controller.createTeam(req, res, jest.fn());
    expect(mockService.create).toHaveBeenCalledWith("user123", mockTeam.name);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      status: "success",
      data: mockTeam,
    });
  });

  test("updateTeam updates a team", async () => {
    const mockTeam = { name: "Updated Team" };
    mockService.update.mockResolvedValue(mockTeam as any);

    const req = { params: { teamId: "team123" }, body: mockTeam } as any;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any;

    await controller.updateTeam(req, res, jest.fn());
    expect(mockService.update).toHaveBeenCalledWith(
      req.params.teamId,
      mockTeam.name
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: "success",
      data: mockTeam,
    });
  });

  test("deleteTeam removes a team", async () => {
    mockService.remove.mockResolvedValue(undefined);

    const req = { params: { teamId: "team123" } } as any;
    const res = { status: jest.fn().mockReturnThis(), send: jest.fn() } as any;

    await controller.deleteTeam(req, res, jest.fn());
    expect(mockService.remove).toHaveBeenCalledWith("team123");
    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.send).toHaveBeenCalled();
  });
});
