<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250601234123 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            CREATE TABLE empresa (id INT AUTO_INCREMENT NOT NULL, nombre VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, sector VARCHAR(255) DEFAULT NULL, sitio_web VARCHAR(255) DEFAULT NULL, descripcion LONGTEXT DEFAULT NULL, num_empleados LONGTEXT DEFAULT NULL, telefono LONGTEXT DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB
        SQL);
        $this->addSql(<<<'SQL'
            CREATE TABLE ofertalaboral (id INT AUTO_INCREMENT NOT NULL, empresa_id INT NOT NULL, titulo VARCHAR(255) NOT NULL, descripcion LONGTEXT DEFAULT NULL, tecnologias_requeridas LONGTEXT DEFAULT NULL, experiencia_minima VARCHAR(255) DEFAULT NULL, ubicacion VARCHAR(255) DEFAULT NULL, INDEX IDX_E3372F9F521E1991 (empresa_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB
        SQL);
        $this->addSql(<<<'SQL'
            CREATE TABLE postulacion (id INT AUTO_INCREMENT NOT NULL, usuario_id INT NOT NULL, ofertalaboral_id INT NOT NULL, cv_file_name VARCHAR(255) DEFAULT NULL, updated_at DATETIME DEFAULT NULL, INDEX IDX_17B321BDDB38439E (usuario_id), INDEX IDX_17B321BD3AAFA77C (ofertalaboral_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB
        SQL);
        $this->addSql(<<<'SQL'
            CREATE TABLE usuario (id INT AUTO_INCREMENT NOT NULL, nombre VARCHAR(255) NOT NULL, apellido VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, foto_perfil VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE ofertalaboral ADD CONSTRAINT FK_E3372F9F521E1991 FOREIGN KEY (empresa_id) REFERENCES empresa (id)
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE postulacion ADD CONSTRAINT FK_17B321BDDB38439E FOREIGN KEY (usuario_id) REFERENCES usuario (id)
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE postulacion ADD CONSTRAINT FK_17B321BD3AAFA77C FOREIGN KEY (ofertalaboral_id) REFERENCES ofertalaboral (id)
        SQL);
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            ALTER TABLE ofertalaboral DROP FOREIGN KEY FK_E3372F9F521E1991
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE postulacion DROP FOREIGN KEY FK_17B321BDDB38439E
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE postulacion DROP FOREIGN KEY FK_17B321BD3AAFA77C
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE empresa
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE ofertalaboral
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE postulacion
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE usuario
        SQL);
    }
}
