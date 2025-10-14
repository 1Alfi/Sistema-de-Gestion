package com.sistema_contable.sistema.contable.resources;

import com.sistema_contable.sistema.contable.dto.Mapper;
import com.sistema_contable.sistema.contable.dto.MovementResponseDTO;
import com.sistema_contable.sistema.contable.exceptions.ModelExceptions;
import com.sistema_contable.sistema.contable.model.Movement;
import com.sistema_contable.sistema.contable.services.accounting.interfaces.LedgerService;
import com.sistema_contable.sistema.contable.services.security.AuthorizationService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.DateFormat;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/ledger")
@CrossOrigin(origins = "${FRONT_URL}")
public class LedgerResource {
    //dependencies
    @Autowired
    private LedgerService ledgerService;
    @Autowired
    private AuthorizationService authService;
    @Autowired
    private Mapper modelMapper;

    //endpoints
    @GetMapping(path = "/{id}",produces = "application/json")
    public ResponseEntity<?> ledgerByAccountBetweenDates(

        @RequestHeader("Authorization") String token,
        @PathVariable Long id,
        @RequestParam("before") String before,
        @RequestParam("after")String after) {
        final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        // Declaramos las variables Date para usarlas en el servicio
        Date dateBefore;
        Date dateAfter;
        try {
            // 2. Parsear el String a LocalDate (API moderna)
            LocalDate localDateBefore = LocalDate.parse(before, formatter);
            LocalDate localDateAfter = LocalDate.parse(after, formatter);
            // 3. Convertir LocalDate a java.util.Date (para el servicio)
            // Se establece la hora a medianoche (startOfDay) y se usa la zona horaria del sistema.
            dateBefore = Date.from(localDateBefore.atStartOfDay(ZoneId.systemDefault()).toInstant());
            dateAfter = Date.from(localDateAfter.atStartOfDay(ZoneId.systemDefault()).toInstant());
            authService.authorize(token);
            return new ResponseEntity<>(responseDTOS(ledgerService.LadgerByAccountBetweem(id, dateBefore,dateAfter)), HttpStatus.OK);
        } catch (ModelExceptions exception) {
            return new ResponseEntity<>(null, exception.getHttpStatus());
        }catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);}}

    //secondary methods
    private List<MovementResponseDTO> responseDTOS(List<Movement> movements) {
        return movements.stream().map(movement -> modelMapper.map(movement,MovementResponseDTO.class)).toList();
    }

}
