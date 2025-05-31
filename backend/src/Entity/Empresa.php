<?php

namespace App\Entity;

use App\Repository\EmpresaRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: EmpresaRepository::class)]
class Empresa
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $nombre_empresa = null;

    #[ORM\Column(length: 255)]
    private ?string $email = null;

    #[ORM\Column(length: 255)]
    private ?string $contraseña = null;

    #[ORM\Column(length: 255)]
    private ?string $sector = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $sitio_web = null;

    /**
     * @var Collection<int, Ofertalaboral>
     */
    #[ORM\OneToMany(targetEntity: Ofertalaboral::class, mappedBy: 'empresa', orphanRemoval: true)]
    private Collection $ofertaslaborales;

    public function __construct()
    {
        $this->ofertaslaborales = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNombreEmpresa(): ?string
    {
        return $this->nombre_empresa;
    }

    public function setNombreEmpresa(string $nombre_empresa): static
    {
        $this->nombre_empresa = $nombre_empresa;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): static
    {
        $this->email = $email;

        return $this;
    }

    public function getContraseña(): ?string
    {
        return $this->contraseña;
    }

    public function setContraseña(string $contraseña): static
    {
        $this->contraseña = $contraseña;

        return $this;
    }

    public function getSector(): ?string
    {
        return $this->sector;
    }

    public function setSector(string $sector): static
    {
        $this->sector = $sector;

        return $this;
    }

    public function getSitioWeb(): ?string
    {
        return $this->sitio_web;
    }

    public function setSitioWeb(?string $sitio_web): static
    {
        $this->sitio_web = $sitio_web;

        return $this;
    }

    /**
     * @return Collection<int, Ofertalaboral>
     */
    public function getOfertaslaborales(): Collection
    {
        return $this->ofertaslaborales;
    }

    public function addOfertaslaborale(Ofertalaboral $ofertaslaborale): static
    {
        if (!$this->ofertaslaborales->contains($ofertaslaborale)) {
            $this->ofertaslaborales->add($ofertaslaborale);
            $ofertaslaborale->setEmpresa($this);
        }

        return $this;
    }

    public function removeOfertaslaborale(Ofertalaboral $ofertaslaborale): static
    {
        if ($this->ofertaslaborales->removeElement($ofertaslaborale)) {
            // set the owning side to null (unless already changed)
            if ($ofertaslaborale->getEmpresa() === $this) {
                $ofertaslaborale->setEmpresa(null);
            }
        }

        return $this;
    }
}
