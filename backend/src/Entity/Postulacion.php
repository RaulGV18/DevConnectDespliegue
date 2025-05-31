<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\PostulacionRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: PostulacionRepository::class)]
#[ApiResource]
class Postulacion
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'postulaciones')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Ofertalaboral $ofertalaboral = null;

    #[ORM\ManyToOne(inversedBy: 'postulaciones')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Usuario $usuario = null;

    #[ORM\Column(length: 255)]
    private ?string $cv = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getOfertalaboral(): ?Ofertalaboral
    {
        return $this->ofertalaboral;
    }

    public function setOfertalaboral(?Ofertalaboral $ofertalaboral): static
    {
        $this->ofertalaboral = $ofertalaboral;

        return $this;
    }

    public function getUsuario(): ?Usuario
    {
        return $this->usuario;
    }

    public function setUsuario(?Usuario $usuario): static
    {
        $this->usuario = $usuario;

        return $this;
    }

    public function getCv(): ?string
    {
        return $this->cv;
    }

    public function setCv(string $cv): static
    {
        $this->cv = $cv;

        return $this;
    }
}
