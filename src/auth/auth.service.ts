import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/database/entities/user.entity";
import { Repository } from "typeorm";
import { RegisterDto } from "./dto/register.dto";
import * as bcrypt from 'bcrypt';
import { LoginDto } from "./dto/login.dto";
import { Artist } from "src/database/entities/artist.entity";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly users: Repository<User>,

    @InjectRepository(Artist)
    private readonly artists: Repository<Artist>,

    private readonly jwt: JwtService,
  ) { }

  async register(dto: RegisterDto) {
    const existingUser = await this.users.findOne({
      where: [
        { email: dto.email },
        { username: dto.username },
      ],
    })

    if (existingUser) {
      throw new UnauthorizedException(
        'Email or username already exists',
      )
    }

    const passwordHash = await bcrypt.hash(
      dto.password,
      12,
    )

    const user = this.users.create({
      ...dto,
      passwordHash,
    })

    await this.users.save(user)

    const artist = this.artists.create({
      userId: user.id,
      name: user.name,
      handle: user.username,
    })

    await this.artists.save(artist)

    delete (user as any).password

    return this.issue(user)
  }

  async login(dto: LoginDto) {
    const user = await this.users
      .createQueryBuilder('user')
      .addSelect('user.passwordHash')
      .where('user.email = :email', {
        email: dto.email,
      })
      .getOne();

    if (
      !user ||
      !(await bcrypt.compare(dto.password, user.passwordHash))
    ) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.issue(user);
  }

  private issue(user: User) {
    const accessToken = this.jwt.sign({
      sub: user.id,
      email: user.email,
      role: user.role,
    });

    return {
      accessToken,

      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        username: user.username,
        role: user.role,
        avatarUrl: user.avatarUrl
      },
    };
  }
}