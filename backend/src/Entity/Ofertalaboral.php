<?php

namespace App\Entity;

use App\Repository\OfertalaboralRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: OfertalaboralRepository::class)]
class Ofertalaboral
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $titulo = null;

    #[ORM\Column(type: Types::TEXT)]
    private ?string $descripcion = null;

    #[ORM\Column(type: Types::TEXT)]
    private ?string $tecnologiasRequeridas = null;

    #[ORM\Column(length: 255)]
    private ?string $expercienciaMinima = null;

    #[ORM\Column(length: 255)]
    private ?string $ubicacion = null;

    #[ORM\ManyToOne(inversedBy: 'ofertaslaborales')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Empresa $empresa = null;

    /**
     * @var Collection<int, Postulacion>
     */
    #[ORM\OneToMany(targetEntity: Postulacion::class, mappedBy: 'ofertaLaboral', orphanRemoval: true)]
    private Collection $postulaciones;

    public function __construct()
    {
        $this->postulaciones = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitulo(): ?string
    {
        return $this->titulo;
    }

    public function setTitulo(string $titulo): static
    {
        $this->titulo = $titulo;

        return $this;
    }

    public function getDescripcion(): ?string
    {
        return $this->descripcion;
    }

    public function setDescripcion(string $descripcion): static
    {
        $this->descripcion = $descripcion;

        return $this;
    }

    public function getTecnologiasRequeridas(): ?string
    {
        return $this->tecnologiasRequeridas;
    }

    public function setTecnologiasRequeridas(string $tecnologiasRequeridas): static
    {
        $this->tecnologiasRequeridas = $tecnologiasRequeridas;

        return $this;
    }

    public function getExpercienciaMinima(): ?string
    {
        return $this->expercienciaMinima;
    }

    public function setExpercienciaMinima(string $expercienciaMinima): static
    {
        $this->expercienciaMinima = $expercienciaMinima;

        return $this;
    }

    public function getUbicacion(): ?string
    {
        return $this->ubicacion;
    }

    public function setUbicacion(string $ubicacion): static
    {
        $this->ubicacion = $ubicacion;

        return $this;
    }

    public function getEmpresa(): ?Empresa
    {
        return $this->empresa;
    }

    public function setEmpresa(?Empresa $empresa): static
    {
        $this->empresa = $empresa;

        return $this;
    }

    /**
     * @return Collection<int, Postulacion>
     */
    public function getPostulaciones(): Collection
    {
        return $this->postulaciones;
    }

    public function addPostulacione(Postulacion $postulacione): static
    {
        if (!$this->postulaciones->contains($postulacione)) {
            $this->postulaciones->add($postulacione);
            $postulacione->setOfertaLaboral($this);
        }

        return $this;
    }

    public function removePostulacione(Postulacion $postulacione): static
    {
        if ($this->postulaciones->removeElement($postulacione)) {
            // set the owning side to null (unless already changed)
            if ($postulacione->getOfertaLaboral() === $this) {
                $postulacione->setOfertaLaboral(null);
            }
        }

        return $this;
    }
}
