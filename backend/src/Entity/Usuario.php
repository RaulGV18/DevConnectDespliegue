<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\UsuarioRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: UsuarioRepository::class)]
#[ApiResource] // Esto activa la exposición como API
class Usuario
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 100)]
    private ?string $nombre = null;

    #[ORM\Column(length: 100)]
    private ?string $apellido = null;

    #[ORM\Column(length: 150, unique: true)]
    private ?string $email = null;

    #[ORM\Column(length: 255)]
    private ?string $contrasena = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $fotoPerfil = null;

    // Getters y setters...
    public function getId(): ?int { return $this->id; }
    public function getNombre(): ?string { return $this->nombre; }
    public function setNombre(string $nombre): self { $this->nombre = $nombre; return $this; }

    public function getApellido(): ?string { return $this->apellido; }
    public function setApellido(string $apellido): self { $this->apellido = $apellido; return $this; }

    public function getEmail(): ?string { return $this->email; }
    public function setEmail(string $email): self { $this->email = $email; return $this; }

    public function getContrasena(): ?string { return $this->contrasena; }
    public function setContrasena(string $contrasena): self { $this->contrasena = $contrasena; return $this; }

    public function getFotoPerfil(): ?string { return $this->fotoPerfil; }
    public function setFotoPerfil(?string $fotoPerfil): self { $this->fotoPerfil = $fotoPerfil; return $this; }
}
