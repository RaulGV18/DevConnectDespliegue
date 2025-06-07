<?php
// src/Controller/CvUploadController.php
namespace App\Controller;

use App\Entity\Postulacion;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\File\Exception\FileException;

class CvUploadController extends AbstractController
{
    #[Route('/postulacion/upload-pdf/{postulacionId}', name: 'postulacion_upload_pdf', methods: ['POST'])]
    public function uploadPdf(
        int $postulacionId,
        Request $request,
        EntityManagerInterface $em
    ): Response {
        // Buscar la postulación por id
        $postulacion = $em->getRepository(Postulacion::class)->find($postulacionId);

        if (!$postulacion) {
            return new JsonResponse(['error' => 'Postulación no encontrada.'], Response::HTTP_NOT_FOUND);
        }

        // Obtener archivo enviado en el campo 'cv'
        $uploadedFile = $request->files->get('cv');
        if (!$uploadedFile) {
            return new JsonResponse(['error' => 'Archivo CV no recibido.'], Response::HTTP_BAD_REQUEST);
        }

        // Validar tipos MIME permitidos
        $allowedMimeTypes = [
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ];
        if (!in_array($uploadedFile->getMimeType(), $allowedMimeTypes)) {
            return new JsonResponse(['error' => 'Tipo de archivo no permitido.'], Response::HTTP_UNSUPPORTED_MEDIA_TYPE);
        }

        // Directorio de subida
        $uploadDir = $this->getParameter('kernel.project_dir') . '/public/uploads/pdfs';
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0777, true);
        }

        // Extensión del archivo
        $extension = $uploadedFile->guessExtension() ?: 'pdf';

        // Nombre del archivo: oferta<ID>_usuario<ID>.ext
        $newFilename = sprintf(
            'oferta%d_usuario%d.%s',
            $postulacion->getOfertalaboral()->getId(),
            $postulacion->getUsuario()->getId(),
            $extension
        );

        try {
            // Mover archivo al directorio destino
            $uploadedFile->move($uploadDir, $newFilename);
        } catch (FileException $e) {
            return new JsonResponse(
                ['error' => 'Error al mover archivo: ' . $e->getMessage()],
                Response::HTTP_INTERNAL_SERVER_ERROR
            );
        }

        return new JsonResponse(['message' => 'CV subido con éxito.'], Response::HTTP_OK);
    }
}
