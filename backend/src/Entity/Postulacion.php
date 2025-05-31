<?php

namespace App\Entity;

use App\Repository\PostulacionRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: PostulacionRepository::class)]
class Postulacion
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $estado = null;

    #[ORM\Column(length: 255)]
    private ?string $Usuario = null;

    #[ORM\Column(length: 255)]
    private ?string $cv = null;

    #[ORM\ManyToOne(inversedBy: 'postulaciones')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Usuario $usuario = null;

    #[ORM\ManyToOne(inversedBy: 'postulaciones')]
    #[ORM\JoinColumn(nullable: false)]
    private ?OfertaLaboral $ofertaLaboral = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEstado(): ?string
    {
        return $this->estado;
    }

    public function setEstado(string $estado): static
    {
        $this->estado = $estado;

        return $this;
    }

    public function getUsuario(): ?string
    {
        return $this->Usuario;
    }

    public function setUsuario(string $Usuario): static
    {
        $this->Usuario = $Usuario;

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

    public function getOfertaLaboral(): ?OfertaLaboral
    {
        return $this->ofertaLaboral;
    }

    public function setOfertaLaboral(?OfertaLaboral $ofertaLaboral): static
    {
        $this->ofertaLaboral = $ofertaLaboral;

        return $this;
    }
}
