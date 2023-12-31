import {
  NotFoundException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Inventory } from '@/modules/inventory/entities/inventory.entity';
import { CreateInventoryDto, UpdateInventoryDto } from './dto/inventory.dto';
import { VenueService } from '../venue/venue.service';

@Injectable()
export class InventoryService {
  constructor(
    @InjectModel(Inventory) private inventoryModel: typeof Inventory,
    private readonly venueService: VenueService,
  ) {}

  async findAll(includeDeleted: boolean): Promise<Inventory[]> {
    try {
      if (includeDeleted) {
        return this.inventoryModel.findAll({
          paranoid: false,
        });
      }

      return this.inventoryModel.findAll();
    } catch (error) {
      throw new InternalServerErrorException(
        `Could not find inventories: ${error}`,
      );
    }
  }

  async findById(id: number): Promise<Inventory> {
    const inventoryFound = await this.inventoryModel.findByPk(id, {
      paranoid: false,
    });

    if (!inventoryFound)
      throw new NotFoundException("The inventory id provided wasn't found");

    try {
      return inventoryFound;
    } catch (error) {
      throw new InternalServerErrorException(`Inventory not found: ${error}`);
    }
  }

  async findInventoriesByVenueId(id: number): Promise<any> {
    const inventories = await this.inventoryModel.findAll({
      where: {
        venue_id: id,
      },
    });

    if (!inventories.length)
      throw new NotFoundException('Could not found Inventories');

    try {
      return inventories;
    } catch (error) {
      throw new InternalServerErrorException(`Inventories not found: ${error}`);
    }
  }

  async create(inventory: CreateInventoryDto): Promise<Inventory> {
    try {
      const { venueId, name } = inventory;

      await this.venueService.findById(venueId);

      return this.inventoryModel.create({
        venue_id: venueId,
        name: name,
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `Inventory could not be created: ${error}`,
      );
    }
  }

  async update(inventory: UpdateInventoryDto, id: number): Promise<Inventory> {
    const { venueId, name } = inventory;

    if (venueId) {
      await this.venueService.findById(venueId);
    }

    const [updatedRows] = await this.inventoryModel.update(
      {
        venue_id: venueId,
        name: name,
      },
      {
        where: {
          id,
        },
      },
    );

    if (updatedRows === 0) throw new NotFoundException('Inventory not found');

    try {
      return this.findById(id);
    } catch (error) {
      throw new InternalServerErrorException(
        `Inventory could not be updated: ${error}`,
      );
    }
  }

  async softDelete(id: number): Promise<Inventory> {
    const updatedRows = await this.inventoryModel.destroy({
      where: {
        id,
      },
    });

    if (updatedRows === 0) throw new NotFoundException('Inventory not found');

    try {
      return await this.findById(id);
    } catch (error) {
      throw new InternalServerErrorException(
        `Faild to delete inventory: ${error}`,
      );
    }
  }
}
